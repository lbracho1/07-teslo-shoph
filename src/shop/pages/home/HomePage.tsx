import { CustomPagination } from "@/components/custom/CustomPagination"
import { ProductsGrid } from "@/shop/components"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

    const { data } = useProducts()

    return (
        <>
            <CustomJumbotron title='Todos los productos' />

            <ProductsGrid product={data?.products || []} />

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
