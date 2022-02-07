export interface PrimeNumberProps {
    message: string
    status: string
    data?: number[]
}

export interface ResponseProps {
    state: PrimeNumberProps
    isLoading: boolean
    error: string | null
}