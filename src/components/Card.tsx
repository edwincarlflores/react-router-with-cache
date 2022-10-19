type CardProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Card = ({ userId, id, title, body }: CardProps) => {
  return (
    <section className="flex cursor-pointer flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm ">{body}</p>
    </section>
  );
};

export default Card;
