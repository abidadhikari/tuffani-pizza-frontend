interface MapSectionProps {
  lat?: number;
  lng?: number;
  searchText?: string;
  zoom?: number;
}

export default function MapSection({
  lat,
  lng,
  searchText,
  zoom = 15,
}: MapSectionProps) {
  const mapSrc =
    lat !== undefined && lng !== undefined
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(
          searchText ?? "",
        )}&z=${zoom}&output=embed`;

  return (
    <div className="relative w-full pb-[66.66%] rounded-2xl overflow-hidden">
      {/* Map iframe */}
      <iframe
        src={mapSrc}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        title="Location Map"
      />
    </div>
  );
}
