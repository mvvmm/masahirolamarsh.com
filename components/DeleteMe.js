export default function DeleteMe() {
  return (
    <>
      <Link
        to={`/admin/offers/edit/${offer.id}/marketing${search}`}
        onClick={() => {
          props.setQueryParams({ selectedOffer: offer.id });
        }}
      />
    </>
  );
}
