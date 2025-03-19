import CollectionDetail from './_components/collection-detail'

export default async function CollectionDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = decodeURIComponent(params?.id)
  return (
    <CollectionDetail id={id} />
  )
}
