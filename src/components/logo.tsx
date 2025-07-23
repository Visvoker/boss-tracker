import Image from "next/image";
import React from "react";
import logo from "../../public/AxisCult.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" width={100} />
    </Link>
  );
}
