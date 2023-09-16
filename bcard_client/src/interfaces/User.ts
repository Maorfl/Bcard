export default interface User {
    name: {
        first: string,
        middle?: string,
        last: string
    },
    // firstName: string,
    // middleName?: string,
    // lastName: string,
    phone: string,
    email: string,
    password?: string,
    image?: {
        url?: string,
        alt?: string
    },
    // imageUrl?: string,
    // imageAlt?: string,
    address: {
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip?: string,
    }
    gender?: string,
    userType?: string
    _id?: string
}