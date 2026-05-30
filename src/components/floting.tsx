import React, { useState, useRef } from "react";
// import { Pencil, Copy } from "lucide-react";
// To install @radix-ui/react-radio-group, run:
//   npm install @radix-ui/react-radio-group
// Or with yarn:
//   yarn add @radix-ui/react-radio-group

import * as RadioGroup from "@radix-ui/react-radio-group";
import { PencilCircleIcon } from "@phosphor-icons/react";
import { CopyIcon } from "@phosphor-icons/react/dist/icons/Copy";

// Définition des couleurs de la palette
const colorPalette = [
  { value: "47,16,17", bg: "rgb(50, 47, 36)" },
  { value: "43,18,16", bg: "rgb(48, 44, 33)" },
  { value: "25,23,72", bg: "rgb(200, 181, 167)" },
  { value: "33,14,45", bg: "rgb(131, 116, 99)" },
  { value: "60,14,35", bg: "rgb(102, 102, 77)" },
  { value: "65,15,55", bg: "rgb(155, 157, 123)" },
  { value: "340,1,58", bg: "rgb(149, 147, 148)" },
];

export default function FloatingToolbar() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(colorPalette[2].value); // couleur par défaut
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion du changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  // Copier l'image dans le presse-papiers (si supporté)
  const handleCopyImage = async () => {
    if (!imageSrc) return;
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      // feedback visuel (à implémenter selon vos besoins)
      console.log("Image copiée !");
    } catch (err) {
      console.error("Échec de la copie :", err);
    }
  };

  return (
    <div
      className="fixed min-h-11 min-w-11 p-2 bottom-4 gap-3 mx-auto inset-x-0 w-fit border z-40 flex items-center bg-white/50 dark:bg-gray-950/75 backdrop-blur-lg rounded-full shadow-md"
      style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}
    >
      {/* Avatar + bouton d'upload */}
      <div className="size-9 relative rounded-full">
        <div
          role="presentation"
          tabIndex={0}
          className="relative overflow-hidden group z-20 flex justify-center items-center outline-primary-600 size-full select-none cursor-pointer duration-300 border border-transparent hover:border-[--ui-border-color] rounded-full border-gray-300 hover:bg-white/50 dark:hover:bg-gray-925/50"
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Icône crayon au survol */}
          <PencilCircleIcon className="size-3.5 text-title m-auto translate-y-1 scale-50 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 duration-300" />
          <input
            ref={fileInputRef}
            accept="image/*"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Image de prévisualisation */}
        <div
          className="aspect-square absolute inset-0 shadow-md shadow-gray-950/20 border border-white/50 overflow-hidden rounded-full before:absolute before:inset-px before:rounded-full before:border before:border-white/25 dark:border-gray-950"
          style={{ opacity: 1, transform: "none" }}
        >
          {imageSrc && (
            <img
              alt="Uploaded"
              className="size-full object-cover rounded-full"
              src={imageSrc}
            />
          )}
        </div>
      </div>

      {/* Séparateur */}
      <div className="block size-1 rounded-full bg-gray-950/10 dark:bg-white/10" />

      {/* Palette de couleurs */}
      <RadioGroup.Root
        value={selectedColor}
        onValueChange={setSelectedColor}
        aria-label="Color Palette"
        className="flex gap-3 items-center"
      >
        {/* Premier bouton (séparé visuellement) */}
        <div className="size-5 relative">
          <RadioGroup.Item
            value={colorPalette[0].value}
            className="absolute inset-0 rounded-full border border-gray-950/5 dark:border-white/5"
            style={{ background: colorPalette[0].bg }}
          />
        </div>

        {/* Séparateur vertical */}
        <div className="h-4 w-0.5 border-r border-white bg-gray-950/10 dark:border-gray-950 dark:bg-white/10" />

        {/* Groupe des 5 couleurs suivantes */}
        <div className="h-5 flex gap-2">
          {colorPalette.slice(1).map((color) => (
            <div key={color.value} className="size-5 relative">
              <RadioGroup.Item
                value={color.value}
                className="absolute inset-0 border border-gray-950/5 rounded-full size-5 dark:border-white/5"
                style={{ background: color.bg }}
              >
                <RadioGroup.Indicator className="absolute -inset-[3px] ring-[1.5px] m-auto rounded-full ring-gray-950 dark:ring-white" />
              </RadioGroup.Item>
            </div>
          ))}
        </div>
      </RadioGroup.Root>

      {/* Séparateur */}
      <div className="block size-1 rounded-full bg-gray-950/10 dark:bg-white/10" />

      {/* Bouton Copier */}
      <button
        onClick={handleCopyImage}
        className="btn flex sz-sm gap-2 variant-ghost mr-1.5 shadow-none rounded-full before:rounded-full icon-only variant-outlined dark:before:bg-gray-800 before:shadow-inner dark:before:shadow-white/5"
        aria-label="Copier l'image"
      >
        <CopyIcon className="size-3.5 duration-300 absolute inset-0 m-auto" />
      </button>
    </div>
  );
}