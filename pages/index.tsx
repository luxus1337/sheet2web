import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

type HomeProps = {
	company: {
		name: string;
		contactEmail: string;
		domain: string;
		mission: string;
		vision: string;
		logo: string;
	},
	sheetUrl: string
}

const Home: NextPage<HomeProps> = ({
	company: {
		name,
		contactEmail,
		domain,
		mission,
		vision,
		logo,
	},
	sheetUrl
}) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>{name}</title>
				<meta name="description" content={mission} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header>
				<Image src={logo} alt={mission} width={100} height={100} />
			</header>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href={domain}>{name}!</a>
				</h1>
				
				<p className={styles.description}>
					{mission}
				</p>

				<p className={styles.description}>
					{vision}
				</p>

				<p className={styles.description}>
					Get started by editing{' '}
					<a href={sheetUrl} className={styles.card}>
						The Sheet
					</a>
				</p>

				<p className={styles.description}>
					Send us a message at: 
					<a href={`mailto:${contactEmail}`} className={styles.card}>
						{contactEmail}
					</a>
				</p>
			</main>

			<footer className={styles.footer}>
				<h6>Powered by{' '}</h6>
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

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<HomeProps>> => {
	return {
		revalidate: 60,
		props: {
			company: {
				name: "Sheet2Web",
				contactEmail: "info@sheet2.website",
				domain: "https://sheet2.website",
				mission: "We bring the sheet to the web",
				vision: "If you know sheets you can manage the web",
				logo: "https://paratroopers.dev/img/Paratroopers-emblem-svg.svg"
			},
			sheetUrl: "https://docs.google.com/spreadsheets/d/1Q6krO_zUgl1F0KcyU2Vnqau7BYPxM2m-MT3OcuvACqo/edit#gid=1485945189",
		},
	}
}
	

export default Home
