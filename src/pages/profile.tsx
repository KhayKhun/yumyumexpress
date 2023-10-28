import Header from "../components/essentials/Header";
import supabase from "../lib/supabase";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackButton, LogoutIcon } from "../components/essentials/Icons";
import NavigateBar from "@/components/essentials/NavigateBar";

type profileType = {
  id: string;
  full_name: string;
  address: any;
  phone: any;
  email: any;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const nameRef = useRef<any>(null);
  const addressRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);

  const [searchParams, setSearchParams] = useSearchParams({
    edit: "false",
  });
  const edit = searchParams.get("edit");
  const [profile, setProfile] = useState<profileType>({
    id: "",
    full_name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState({
    name: false,
    nameMessage:
      "Username must be at least 4 characters and not more than 25 characters",
    phone: false,
    phoneMessage: "Invalid phone number ( Must be 10 digits )",
  });

  console.log(profile);
  const fetchProfile = async (id: string, email: string | undefined) => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("id,full_name,address,email,phone")
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }
    if (profiles) {
      if (email) {
        setProfile({ ...profiles[0], email: email });
      } else {
        setProfile({ ...profiles[0], email: "email not found" });
      }
    }
  };

  useEffect(() => {
    const getSession = supabase.auth.getSession();

    getSession.then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data.session?.user) {
        fetchProfile(
          response.data.session?.user.id,
          response.data.session?.user.email
        );
      } else {
        navigate("/");
      }
    });
  }, []);

  const SaveFunction = () => {
    console.log("fn called");
    const nameInput = nameRef.current.value;
    const addressInput = addressRef.current.value;
    const phoneInput = phoneRef.current.value;
    if (
      nameInput === profile?.full_name &&
      addressInput === profile?.address &&
      phoneInput === profile?.phone
    ) {
      navigate("/");
      return;
    }
    if (nameInput.length < 5) {
      console.log("con1");
      setError((prev) => ({ ...prev, name: true }));
      return;
    }
    if (Number(phoneInput) && phoneInput.length == 10) {
      // No error
      const updateProfile = async () => {
        console.log("updateProfile");
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: nameInput,
            phone: phoneInput,
            address: addressInput,
          })
          .eq("id", profile?.id)
          .select();

        if (error) {
          console.log(error);
          return;
        }
        navigate("/");
      };
      updateProfile();
    } else {
      console.log("con3");
      setError((prev) => ({ ...prev, phone: true }));
    }
  };

  const Logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }
    console.log("Logout completed");
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="w-full pl-[40px]">
        <NavigateBar
          links={[
            {
              display: "Home",
              link: "/",
            },
            {
              display: "Profile",
              link: "/profile",
            },
          ]}
        />
      </div>
      <main className="w-screen py-3 flex justify-center text-sm sm:text-base">
        <div className="flex flex-col w-[90%] sm:w-[70%] shadow-lg p-4 gap-2">
          <BackButton />
          <h1 className="text-primary-green font-semibold mx-auto uppercase text-base sm:text-lg">
            My Profile
          </h1>
          <p className="text-gray-600 italic text-[12px] sm:text-sm underline">
            {profile?.email}
          </p>
          <input
            ref={nameRef}
            className={`disabled:text-gray-400 p-1 sm:p-3 rounded-sm md:rounded-lg disabled:border-gray-400 ${
              error.name ? "border-red-600" : "border-primary-green"
            } bg-gray-50`}
            type="text"
            defaultValue={profile?.full_name}
            placeholder="Enter your full name"
            disabled={edit === "false"}
          />
          <p className="error">{error.name && error.nameMessage}</p>
          <textarea
            ref={addressRef}
            className={`disabled:text-gray-400 w-full resize-none p-1 sm:p-2 min-h-[100px] bg-gray-50  border disabled:border-gray-400 rounded-sm md:rounded-lg`}
            defaultValue={profile?.address}
            placeholder={
              edit === "true"
                ? "Enter your delivery address"
                : "Address not filled"
            }
            disabled={edit === "false"}
          />
          <div className="flex ">
            <p className="p-1 sm:p-3 border rounded-sm md:rounded-lg border-r-0 rounded-tr-none rounded-br-none">
              +95
            </p>
            <input
              ref={phoneRef}
              className={`p-1 sm:p-3 rounded-sm md:rounded-lg ${
                error.phone ? "border-red-600" : "border-primary-green"
              } disabled:border-gray-400 disabled:text-gray-400 bg-gray-50 flex-1 rounded-tl-none rounded-bl-none`}
              type="text"
              defaultValue={profile?.phone}
              placeholder={
                edit === "true"
                  ? "Enter your phone number"
                  : "Phone number not filled"
              }
              disabled={edit === "false"}
            />
          </div>
          <p className="error">{error.phone && error.phoneMessage}</p>

          <div className="flex w-full justify-between mt-4">
            {/* Logout */}
            <button
              onClick={Logout}
              className="flex items-center gap-2 text-primary-green hover:text-green-600"
            >
              Logout <LogoutIcon />
            </button>
            <div className="flex gap-2">
              {/* Edit */}
              <button
                className="green-btn-border"
                disabled={edit === "true"}
                onClick={() => {
                  setSearchParams(
                    (prev: any) => {
                      prev.set("edit", "true");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                Edit
              </button>
              {/* Save */}
              <button onClick={SaveFunction} className="green-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
