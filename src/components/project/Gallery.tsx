interface Props {
    items: any[];
}

export default function Gallery({ items }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <h3 className="text-2xl text-center">Gallery</h3>
            <div className="flex flex-wrap justify-center gap-5">
                {items && items.map((item, idx) => (
                    <div key={idx}>
                        <img
                            src={item.url}
                            alt={item.alt}
                            className="size-72 rounded-2xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
