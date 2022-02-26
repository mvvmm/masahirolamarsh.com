export default function Content({ children, overlap }) {
  return <div className={`py-12 ${overlap && "pt-0"}`}>{children}</div>;
}
