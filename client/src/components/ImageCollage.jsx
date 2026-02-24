function ImageCollage({ images }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="h-[36rem] max-w-[1152px] w-auto object-cover rounded-lg shadow-[4px_4px_9px_6px_#6E0C1B] hover:h-[37rem] hover:cursor-pointer transition-all"
        />
      ))}
    </div>
  );
}

export default ImageCollage;
