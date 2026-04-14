import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'http://www.kingoflinks.net';
const OUTPUT_DIR = path.resolve('../public/data');

// Utility to ensure directory exists
async function ensureDir() {
    try { await fs.access(OUTPUT_DIR); } 
    catch { await fs.mkdir(OUTPUT_DIR, { recursive: true }); }
}

// Example: Scrape Sahaba/Mukhalifeen Profiles
async function scrapeProfiles(urlPath, filename) {
    try {
        console.log(`Fetching data for ${filename}...`);
        // Note: In a real scenario, you'd navigate through pagination/indexes here
        const response = await axios.get(`${BASE_URL}/${urlPath}`);
        const $ = cheerio.load(response.data);
        
        const results = [];
        
        // This selector must be adjusted to match kingoflinks.net's actual DOM structure
        $('.content-row').each((i, el) => {
            results.push({
                id: i + 1,
                name: $(el).find('.name-class').text().trim() || 'اسم غير متوفر',
                birth: $(el).find('.birth-class').text().trim() || 'غير معروف',
                death: $(el).find('.death-class').text().trim() || 'غير معروف',
                era: $(el).find('.era-class').text().trim() || '-',
                narrations: $(el).find('.narrations-class').text().trim() || '0',
                source: $(el).find('.source-class').text().trim() || 'موقع شبكة كينغ أوف لينكس'
            });
        });

        await fs.writeFile(`${OUTPUT_DIR}/${filename}`, JSON.stringify(results, null, 2), 'utf-8');
        console.log(`✅ Saved ${filename}`);
    } catch (error) {
        console.error(`❌ Error scraping ${filename}:`, error.message);
    }
}

async function runScraper() {
    await ensureDir();
    // Run scrapers (Replace with actual paths from the source site)
    await scrapeProfiles('sahaba_index.html', 'sahaba.json');
    await scrapeProfiles('mukhalifeen_index.html', 'mukhalifeen.json');
    // Add additional scrapers for mazalim and research...
}

runScraper();
