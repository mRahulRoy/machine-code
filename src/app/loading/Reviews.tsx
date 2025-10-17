export default async function Reviews() {
    const res = await fetch(`https://fakestoreapi.com/products/${1}/reviews`,{
        cache:"no-store"
    });
     // 🧠 Check if response is okay
    if (!res.ok) {
        // You can throw an error or show a fallback UI
        throw new Error(`Failed to fetch product: ${res.status}`);
    }
    const reviews = await res.json();

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map((r:any) => <p key={r.id}>{r.comment}</p>)}
        </div>
    );
}
