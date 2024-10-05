import { Navbar } from "../_components/navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
