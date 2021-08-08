import Image from "next/image";
import { Instagram } from "@icons-pack/react-simple-icons";

export default function ComingSoon() {
  return (
    <div class="absolute inset-0">
      <a href="https://www.instagram.com/hirolamarsh">
        <div className="h-full flex flex-wrap content-center text-center">
          <div className="mx-auto">
            <Image
              src="/img/coming-soon1.jpg"
              width={642}
              height={258}
              alt="It's called F A M I L Y"
              quality={100}
            />
            <div className="font-garamond border-white border">
              <p className="font-light">masahirolamarsh.com</p>
              <p className="font-light text-sm">coming soon</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

// <Image
//   src="/img/coming-soon.jpg"
//   width={1080}
//   height={1080}
//   alt="It's called F A M I L Y"
//   quality={100}
//   objectFit="contain"
// />;
