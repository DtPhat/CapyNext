import CollectionDetail from './_components/collection-detail'

export default async function CollectionDetailPage({ params }: { params: { id: string } }) {
  // const id = decodeURIComponent(params?.id)
  const id = params.id
  return (
    <CollectionDetail id={id} />
  )
}
