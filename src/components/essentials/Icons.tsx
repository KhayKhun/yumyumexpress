import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RiUser3Line,
  RiArrowLeftLine,
  RiHeart3Line,
  RiLogoutBoxLine,
} from "react-icons/ri";
import {
  BsBag,
  BsCart2,
  BsStarFill,
  BsShopWindow,
  BsPlus,
  BsDash,
  BsX,
  BsClockHistory,
} from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

interface IconProps {
  className ?: string;
}

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <RiUser3Line className={className} />
);
export const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (
  <BsBag className={className} />
);
export const EditIcon: React.FC<IconProps> = ({ className }) => (
  <FiEdit className={className} />
);
export const HeartLineIcon: React.FC<IconProps> = ({ className }) => (
  <RiHeart3Line className={className} />
);
export const StarFillIcon: React.FC<IconProps> = ({ className }) => (
  <BsStarFill className={className} />
);
export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <BsPlus className={className} />
);
export const DashIcon: React.FC<IconProps> = ({ className }) => (
  <BsDash className={className} />
);
export const CartIcon: React.FC<IconProps> = ({ className }) => (
  <BsCart2 className={className} />
);
export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
  <BsX className={className} />
);
export const ResturantIcon: React.FC<IconProps> = ({ className }) => (
  <BsShopWindow className={className} />
);
export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
  <RiLogoutBoxLine className={className} />
);
export const HistoryIcon: React.FC<IconProps> = ({ className }) => (
  <BsClockHistory className={className} />
);

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className="text-lg text-primary-green flex items-center"
    >
      <RiArrowLeftLine />
      <span className="text-sm">Back</span>
    </button>
  );
};
