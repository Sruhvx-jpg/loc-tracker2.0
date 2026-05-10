import { useEffect, useState } from "react";
import heroImage from "./registerAsset/landing-page-background.png";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [coords, setCoords] = useState({
    lat: "LOCATING...",
    lng: "",
  });

  /* fetch user coords */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: `${position.coords.latitude.toFixed(4)}° N`,
          lng: `${position.coords.longitude.toFixed(4)}° E`,
        });
      },
      () => {
        setCoords({
          lat: "ACCESS",
          lng: "DENIED",
        });
      }
    );
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 "></div>

      {/* main card */}
      <div className="relative z-10 w-full max-w-[700px]  backdrop-blur-sm border-[4px]  border-[#171717] shadow-[10px_10px_0px_#111] overflow-hidden">

        {/* navbar */}
        <div className="h-12 bg-[#101010] border-b-[4px] border-[#1a1a1a] flex items-center justify-between px-5">

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#f2c40f]" />
            <div className="w-4 h-4 rounded-full bg-[#d9aa00]" />
            <div className="w-4 h-4 rounded-full bg-[#ffe06a]" />
          </div>

          <p className="text-[#f2c40f] text-sm font-black tracking-[2px] uppercase">
            LOCTRACKER v1.0
          </p>
        </div>

        {/* content */}
        <div className="px-10 py-10">

          {/* heading */}
          <div className="text-center">

            <h1
              className="animate-[heroFloat_5s_ease-in-out_infinite] text-[82px] leading-[0.86] font-black uppercase text-[#111]"
              style={{
                fontFamily: "Impact, sans-serif",
                textShadow: `
                  3px 3px 0px rgba(0,0,0,0.22),
                  5px 5px 0px rgba(0,0,0,0.12)
                `,
              }}
            >
              CREATE
              <br />
              AN
              <br />
              ACCOUNT
            </h1>

            <p
              className="mt-5 text-[1.4rem] font-black text-[#1a1a1a]"
              style={{
                letterSpacing: "0.5px",
              }}
            >
              Let's get you on the map.
            </p>

            {/* divider */}
            <div className="flex items-center justify-center gap-6 mt-10">

              {/* static line */}
              <div className="w-24 border-t-[4px] border-dashed border-[#1a1a1a]"></div>

              {/* animated marker */}
              <MapPin
                size={28}
                className="text-[#111] animate-[markerFloat_2.8s_ease-in-out_infinite]"
              />

              {/* static line */}
              <div className="w-24 border-t-[4px] border-dashed border-[#1a1a1a]"></div>
            </div>
          </div>

          {/* form */}
          <form className="mt-14 space-y-7">

            {/* username */}
            <div>
              <label className="block mb-2 text-[#111] font-black uppercase tracking-wide">
                Username
              </label>

              <div className="flex items-center border-[3px] border-[#1a1a1a] bg-[#f7d74f] overflow-hidden shadow-[5px_5px_0px_#1a1a1a] hover:-translate-y-1 transition-all duration-200">

                <div className="w-16 h-16 bg-[#151515] flex items-center justify-center shrink-0">
                  <User size={22} className="text-[#f2c40f]" />
                </div>

                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full h-16 px-5 bg-transparent outline-none text-[#111] font-semibold placeholder:text-[#222]/60"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label className="block mb-2 text-[#111] font-black uppercase tracking-wide">
                Email
              </label>

              <div className="flex items-center border-[3px] border-[#1a1a1a] bg-[#f7d74f] overflow-hidden shadow-[5px_5px_0px_#1a1a1a] hover:-translate-y-1 transition-all duration-200">

                <div className="w-16 h-16 bg-[#151515] flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-[#f2c40f]" />
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-16 px-5 bg-transparent outline-none text-[#111] font-semibold placeholder:text-[#222]/60"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block mb-2 text-[#111] font-black uppercase tracking-wide">
                Password
              </label>

              <div className="flex items-center border-[3px] border-[#1a1a1a] bg-[#f7d74f] overflow-hidden shadow-[5px_5px_0px_#1a1a1a] hover:-translate-y-1 transition-all duration-200">

                <div className="w-16 h-16 bg-[#151515] flex items-center justify-center shrink-0">
                  <Lock size={22} className="text-[#f2c40f]" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-16 px-5 bg-transparent outline-none text-[#111] font-semibold placeholder:text-[#222]/60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-5 h-16 flex items-center justify-center"
                >
                  {showPassword ? (
                    <EyeOff size={22} className="text-[#111]" />
                  ) : (
                    <Eye size={22} className="text-[#111]" />
                  )}
                </button>
              </div>
            </div>

            {/* terms */}
            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                className="w-5 h-5 accent-black"
              />

              <span className="text-[#111] font-semibold">
                I agree to the{" "}
                <span className="underline font-black cursor-pointer hover:opacity-70">
                  Terms & Conditions
                </span>
              </span>
            </label>

            {/* signup */}
            <button
              type="submit"
              className="
                w-full
                h-20
                bg-[#111]
                text-[#f2c40f]
                border-[3px]
                border-[#1a1a1a]
                text-3xl
                font-black
                tracking-[3px]
                flex
                items-center
                justify-center
                gap-4
                shadow-[6px_6px_0px_#1a1a1a]
                hover:translate-x-[4px]
                hover:translate-y-[4px]
                hover:shadow-none
                transition-all
                duration-150
              "
            >
              SIGN UP
              <ArrowRight size={32} />
            </button>
          </form>

          {/* login */}
          <p className="p-5 text-center mt-8 text-[#111] font-semibold">
            Already have an account?{" "}
            <span className="underline font-black cursor-pointer hover:opacity-70">
              Log in
            </span>
          </p>
        </div>

        {/* footer */}
        <div className="bg-[#101010] border-t-[4px] border-[#1a1a1a] px-5 py-4 flex items-center justify-between">

          <p className="text-[#f2c40f] text-sm font-bold">
            © 2024 Loctracker. All rights reserved.
          </p>

          <div
            className="
              border-[3px]
              border-[#c8a300]
              bg-[#181818]
              px-4
              py-2
              text-[#ffd94a]
              font-black
              tracking-[2px]
              animate-[coordGlow_3s_linear_infinite]
            "
          >
            {coords.lat}, {coords.lng}
          </div>
        </div>
      </div>

      {/* animations */}
      <style>
        {`
          @keyframes heroFloat {
            0%,100% {
              transform: translateY(5px);
            }

            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes markerFloat {
            0%,100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes coordGlow {
            0% {
              opacity: 0.92;

              box-shadow:
                0 0 2px rgba(255,215,0,0.06),
                0 0 6px rgba(255,215,0,0.03);
            }

            25% {
              opacity: 0.96;

              box-shadow:
                0 0 6px rgba(255,215,0,0.10),
                0 0 12px rgba(255,215,0,0.06);
            }

            50% {
              opacity: 1;

              box-shadow:
                0 0 12px rgba(255,215,0,0.18),
                0 0 22px rgba(255,215,0,0.10);
            }

            75% {
              opacity: 0.96;

              box-shadow:
                0 0 6px rgba(255,215,0,0.10),
                0 0 12px rgba(255,215,0,0.06);
            }

            100% {
              opacity: 0.92;

              box-shadow:
                0 0 2px rgba(255,215,0,0.06),
                0 0 6px rgba(255,215,0,0.03);
            }
          }
        `}
      </style>
    </div>
  );
}