import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'data', 'authors.json');

export type Author = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  imageUrl: string;
  role?: string;
  location?: string;
  joinDate?: string;
  email?: string;
  website?: string;
  socialLinks: Record<string, string | undefined>;
  stats?: {
    articles: number;
    followers: number;
    totalViews: number;
    totalLikes: number;
  };
  expertise?: { name: string; level: number; color: string }[];
  specializations?: string[];
  achievements?: { title: string; description: string; icon: string }[];
};

export async function readAuthors(): Promise<Author[]> {
  try {
    if (!fs.existsSync(dataFilePath)) {
      await fs.promises.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.promises.writeFile(dataFilePath, JSON.stringify([]));
      return [];
    }
    const json = await fs.promises.readFile(dataFilePath, 'utf8');
    return JSON.parse(json) as Author[];
  } catch (error) {
    console.error('Error reading authors data:', error);
    return [];
  }
}

export async function writeAuthors(authors: Author[]): Promise<void> {
  try {
    await fs.promises.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.promises.writeFile(dataFilePath, JSON.stringify(authors, null, 2));
  } catch (error) {
    console.error('Error writing authors data:', error);
  }
}
