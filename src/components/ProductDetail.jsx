import { useEffect, useState } from "react";

const ProductoDetalle = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const gameIdString = localStorage.getItem("gameId");
                const gameId = JSON.parse(gameIdString);

                // API
                const timestamp = new Date().getTime();
                const url = `https://store.steampowered.com/api/appdetails?appids=${gameId}&l=spanish&cc=US&t=${timestamp}`;                 
                const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`; //proxy
                const response = await fetch(proxyUrl);
                
                const data = await response.json();
               
                if (data && data[gameId] && data[gameId].success) {
                    setProduct(data[gameId].data);
                } else {
                    setError("No se pudo obtener la información del juego.");
                }
            } catch (err) {
                console.error("Error al obtener los datos del juego:", err);
                setError("Error al cargar los datos del juego.");
            } finally {
                setLoading(false); 
            }
        };

        fetchProductData();
    }, []); 

    if (loading) return ;
    
    if (error) return <h1>{error}</h1>;
    
    if (!product) return <h1>Producto no encontrado o no disponible.</h1>;
    
    return (
        <div className="product-detail-container">
            <h1>{product.name}</h1>
            <img src={product.header_image} alt={product.name} />
            <div dangerouslySetInnerHTML={{ __html: product.about_the_game }} />
            <p>Precio: {product.is_free ? "Gratis" : product.price_overview?.final_formatted}</p>
            {}
        </div>
    );
};

export default ProductoDetalle;
