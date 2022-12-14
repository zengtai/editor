import Head from "next/head";
import Link from "next/link";
import Container from "./Container";
import { SITE_META } from "@/lib/constants";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title} | ${SITE_META.NAME}`}</title>
      </Head>
      <div className="flex flex-col min-h-screen text-sm bg-blue-500">
        <header className="site-header">
          <Container>
            <h1 className="mx-4">Editor</h1>
            <nav className="mx-4">
              <ul>
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
              </ul>
            </nav>
          </Container>
        </header>
        <main className="grow">
          <Container>{children}</Container>
        </main>
        <footer className="site-footer text-center bg-blue-700 text-blue-100 p-4">
          <Container>
            <p dangerouslySetInnerHTML={{ __html: `Ver. 2022.11.09-0.1.0` }} />
          </Container>
        </footer>
      </div>
    </>
  );
}
