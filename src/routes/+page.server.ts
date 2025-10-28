import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('https://sheetdb.io/api/v1/5ivvxdan051gq');
    const raw = (await res.json()) as unknown[];

    return {
        raw
    }
}
