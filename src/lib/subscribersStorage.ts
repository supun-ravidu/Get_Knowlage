import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'data', 'subscribers.json');

export type Subscriber = {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  name?: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  createdAt: string;
  approvedAt?: string;
};

export async function readSubscribers(): Promise<Subscriber[]> {
  try {
    if (!fs.existsSync(dataFilePath)) {
      await fs.promises.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.promises.writeFile(dataFilePath, JSON.stringify([]));
      return [];
    }
    const json = await fs.promises.readFile(dataFilePath, 'utf8');
    return JSON.parse(json) as Subscriber[];
  } catch (error) {
    console.error('Error reading subscribers data:', error);
    return [];
  }
}

export async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  try {
    await fs.promises.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.promises.writeFile(dataFilePath, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('Error writing subscribers data:', error);
  }
}