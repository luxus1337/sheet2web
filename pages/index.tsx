import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

const Home: NextPage = () =>
{
	return (
		<div className={styles.container}>
			<Head>
				<title>Sheet 2 web</title>
				<meta name="description" content="Sheet 2 Web" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://sheet2web.com">Sheet2web!</a>
				</h1>

				<p className={styles.description}>
					Get started by editing{" "}
					<a
						href="https://docs.google.com/spreadsheets/d/1Q6krO_zUgl1F0KcyU2Vnqau7BYPxM2m-MT3OcuvACqo/edit#gid=0"
						className={styles.card}
					>
						The Sheet
					</a>
				</p>
			</main>

			<footer className={styles.footer}>
				<h6>Powered by{" "}</h6>
				<a
					href="https://paratroopers.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className={styles.logo}>
						<Image src="/paratroopers-icon.svg" alt="Paratroopers Logo" width={128} height={128} />
					</span>
				</a>
			</footer>
		</div>
	)
}

export default Home
