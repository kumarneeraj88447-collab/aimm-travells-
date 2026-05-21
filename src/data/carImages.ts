import swiftFront from "@/assets/cars/maruti-suzuki-swift/front.png";
import swiftBack from "@/assets/cars/maruti-suzuki-swift/back.png";
import balenoFront from "@/assets/cars/maruti-suzuki-baleno/front.png";
import balenoBack from "@/assets/cars/maruti-suzuki-baleno/back.png";
import balenoInterior1 from "@/assets/cars/maruti-suzuki-baleno/interior-1.png";
import balenoInterior2 from "@/assets/cars/maruti-suzuki-baleno/interior-2.png";
import balenoInterior3 from "@/assets/cars/maruti-suzuki-baleno/interior-3.png";
import i20Front from "@/assets/cars/hyundai-i20/front.png";
import dzireFront from "@/assets/cars/maruti-suzuki-swift-dzire/front.png";
import dzireImage2 from "@/assets/cars/maruti-suzuki-swift-dzire/image-2.png";
import dzireAutoFront from "@/assets/cars/maruti-suzuki-dzire-automatic/front.png";
import dzireAutoBack from "@/assets/cars/maruti-suzuki-dzire-automatic/back.png";
import venueFront from "@/assets/cars/hyundai-venue/front.png";
import venueBack from "@/assets/cars/hyundai-venue/back.png";
import venueSide from "@/assets/cars/hyundai-venue/side.png";
import syrosFront from "@/assets/cars/kia-syros/front.png";
import syrosBack from "@/assets/cars/kia-syros/back.png";
import syrosSide1 from "@/assets/cars/kia-syros/side-1.png";
import syrosSide2 from "@/assets/cars/kia-syros/side-2.png";
import brezzaFront from "@/assets/cars/maruti-suzuki-brezza/front.png";
import brezzaBack from "@/assets/cars/maruti-suzuki-brezza/back.png";
import brezzaSide1 from "@/assets/cars/maruti-suzuki-brezza/side-1.png";
import brezzaSide2 from "@/assets/cars/maruti-suzuki-brezza/side-2.png";
import ertigaFront from "@/assets/cars/maruti-suzuki-ertiga/front.png";
import ertigaBack from "@/assets/cars/maruti-suzuki-ertiga/back.png";
import ertigaSide from "@/assets/cars/maruti-suzuki-ertiga/side.png";
import innovaFront from "@/assets/cars/toyota-innova/front.png";
import innovaBack from "@/assets/cars/toyota-innova/back.png";
import tharFront from "@/assets/cars/mahindra-thar/front.png";
import tharBack from "@/assets/cars/mahindra-thar/back.png";
import tharSide from "@/assets/cars/mahindra-thar/side.png";
import tharInterior1 from "@/assets/cars/mahindra-thar/interior-1.png";
import tharInterior2 from "@/assets/cars/mahindra-thar/interior-2.png";
import crystaFront from "@/assets/cars/toyota-innova-crysta/front.png";
import crystaBack from "@/assets/cars/toyota-innova-crysta/back.png";
import crystaSide from "@/assets/cars/toyota-innova-crysta/side.png";

/** Car name → gallery images (first image = card cover). */
export const CAR_IMAGES: Record<string, string[]> = {
  "Maruti Suzuki Swift": [swiftFront, swiftBack],
  "Maruti Suzuki Baleno": [
    balenoFront,
    balenoBack,
    balenoInterior1,
    balenoInterior2,
    balenoInterior3,
  ],
  "Hyundai i20": [i20Front],
  "Maruti Suzuki Swift Dzire": [dzireFront, dzireImage2],
  "Maruti Suzuki Dzire Automatic": [dzireAutoFront, dzireAutoBack],
  "Hyundai Venue": [venueFront, venueBack, venueSide],
  "Kia Syros": [syrosFront, syrosBack, syrosSide1, syrosSide2],
  "Maruti Suzuki Brezza": [brezzaFront, brezzaBack, brezzaSide1, brezzaSide2],
  "Maruti Suzuki Ertiga": [ertigaFront, ertigaBack, ertigaSide],
  "Toyota Innova": [innovaFront, innovaBack],
  "Mahindra Thar": [tharFront, tharBack, tharSide, tharInterior1, tharInterior2],
  "Toyota Innova Crysta": [crystaFront, crystaBack, crystaSide],
};

export function getCarImages(carName: string): string[] {
  return CAR_IMAGES[carName] ?? [];
}

export function getCarCoverImage(carName: string): string | undefined {
  return getCarImages(carName)[0];
}
