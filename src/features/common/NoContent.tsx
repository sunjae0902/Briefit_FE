export default function NoContent({ message }: { message: string }) {
  return (
    <div className="flex justify-center font-basic-16 text-xl font-semibold text-gray-600">
      {message}
    </div>
  );
}
