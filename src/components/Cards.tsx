"use client";

import { useState, useEffect } from "react";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function Cards() {
  const imageSets = {
    dorost: ["", "1", "2", "3", "4"],
    vikendovka: ["", "1", "2", "3"],
    dalsi: ["", "1", "2", "3"],
  };

  const [imageSrcs, setImageSrcs] = useState({
    dorost: imageSets.dorost[0],
    vikendovka: imageSets.vikendovka[0],
    dalsi: imageSets.dalsi[0],
  });

  useEffect(() => {
    const updateImage = (
      category: keyof typeof imageSets,
      interval: number,
    ) => {
      return setInterval(() => {
        setImageSrcs((prevSrcs) => {
          const currentIndex = imageSets[category].indexOf(prevSrcs[category]);
          const nextIndex = (currentIndex + 1) % imageSets[category].length;
          return { ...prevSrcs, [category]: imageSets[category][nextIndex] };
        });
      }, interval);
    };
    const intervals = {
      dorost: updateImage("dorost", 4000),
      vikendovka: updateImage("vikendovka", 13000),
      dalsi: updateImage("dalsi", 20000),
    };
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-white rounded-lg shadow-lg">
        <img
          alt="Víkendovky"
          className="w-full h-48 object-cover rounded-t-lg"
          height="200"
          src={`/vikendovka${imageSrcs.vikendovka}.jpg`}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold dark:text-black">
            Víkendovky
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-black">
            Dobrodružství plné her!
            <br />A ještě k v krásné přírodě.
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-lg shadow-lg">
        <img
          alt="Dorostový klub"
          className="w-full h-48 object-cover rounded-t-lg"
          height="200"
          src={`/dorost${imageSrcs.dorost}.jpg`}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold dark:text-black">
            Dorostový klub
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-black">
            Pro všechny holky a kluky od 10 let!
            <br /> Každou středu od 19:00.
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="bg-white rounded-lg shadow-lg">
        <img
          alt="A další"
          className="w-full h-48 object-cover rounded-t-lg"
          height="200"
          src={`/dalsi${imageSrcs.dalsi}.jpg`}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="200"
        />
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold dark:text-black">
            A další
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-black">
            S naším sborem v Medlánkách děláme všechny možné akce, pro rodiny,
            děti, dospělé. Např. kluby maminek, anglické večery, atd.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
