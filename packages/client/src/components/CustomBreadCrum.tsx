import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Items {
    name: string,
    link: string
}

interface Props {
    items: Items[]
};

export const CustomBreadcrum: React.FC<Props> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((navItem, index) => (
                    <div key={index} className="flex items-center space-x-1">
                        <BreadcrumbItem className="items-center flex">
                            <BreadcrumbLink href={navItem.link}>{navItem.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </div>))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default CustomBreadcrum;
