import { TNft } from "../types/token-types";
import { mockCurrentUser } from "./users";

// Mock data
const mockNfts: TNft[] = [
    {
        id: '1',
        name: 'CryptoPunk #1',
        description: 'A unique CryptoPunk NFT',
        imageUrl: '',
        owner: '0x1234567890abcdef',
        price: 10.5,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        creator: mockCurrentUser
    },
    {
        id: '2',
        name: 'CryptoKitty #2',
        description: 'A rare CryptoKitty NFT',
        imageUrl: '',
        owner: '0xabcdef1234567890',
        price: 5.75,
        createdAt: new Date('2023-02-01T00:00:00Z'),
        creator: mockCurrentUser

    },
    {
        id: '3',
        name: 'Decentraland Land #3',
        description: 'A piece of virtual land in Decentraland',
        imageUrl: '',
        owner: '0x7890abcdef123456',
        price: 20.0,
        createdAt: new Date('2023-03-01T00:00:00Z'),
        creator: mockCurrentUser
    },
];

export default mockNfts;