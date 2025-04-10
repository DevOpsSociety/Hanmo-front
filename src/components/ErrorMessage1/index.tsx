export default function ErrorMessage({ message }: { message?: string }) {
  return message ? <p className='text-red-500 text-sm'>{message}</p> : false;
}
