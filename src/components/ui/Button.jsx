export function Button({ className = '', ...props }) {
  return <button className={`border border-black px-4 py-2 hover:bg-black hover:text-white ${className}`} {...props} />;
}
