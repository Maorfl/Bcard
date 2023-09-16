export default interface Card {
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    image?: {
        url?: string,
        alt?: string
    },
    address: {
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip?: string
    },
    bizNumber?: number,
    createsAt?: Date,
    userId?: string,
    favoriteByUsers?: string[];
    _id?: string
}