import pan from "../images/pan.png";

export default function FryingPanLoader() {
  return (
    <div className="mt-[30px] text-center" aria-label="Generating recipe...">
      <img
        src={pan}
        alt="Rotating frying pan"
        className="rotating-pan mx-auto block"
      />
    </div>
  );
}