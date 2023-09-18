export default interface Card {
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    imageUrl?: string,
    imageAlt?: string,
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip?: string,
    userId?: number,
    favoriteByUsers?: number[];
    id?: number
}