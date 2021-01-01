import { InferGetStaticPropsType } from 'next'
import { FC, Fragment } from 'react'
import { Layout, Container } from '../../components/Layout'
import { events } from '../../data/events'
import { defineStaticProps } from '../../utils/next'
import { unique } from '../../utils/utils'

export const getStaticProps = defineStaticProps(async () => {
  return {
    props: {
      events,
      years: unique(events.map((_) => _.year)),
    },
  }
})

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  events,
  years,
}) => (
  <Layout
    title="Veranstaltungen"
    subNavItems={[
      { path: '/veranstaltungen', title: 'Übersicht' },
      ...years.map((_) => ({ path: `/veranstaltungen/${_}`, title: `${_}` })),
    ]}
  >
    <div className="py-10 text-gray-600 bg-white lg:py-24">
      <Container>
        <div className="mb-5 text-2xl font-bold text-gray-900">
          Veranstaltungen in 2020
        </div>
        <div className="pb-10 font-normal text-gray-900">
          Alle unsere Künstler und Referenten sind ehrenamtlich für die Stiftung
          tätig. Sie sind dem Hause Schickling in besonderer Weise verbunden.
          Ihnen gilt zuerst unser Dank! Manche kommen immer wieder zu uns und
          machen ihr Wort, ihre Musik, ihre Kunst allen zum Geschenk. Junge
          Musiker erproben hier gerne ihre Programme vor einem wohlgesonnenen
          Publikum.
        </div>
        {events.map((event) => (
          <Fragment key={event.title}>
            <EventBox {...event} />
            <Spacer />
          </Fragment>
        ))}
        <div className="mt-16 mb-1 text-xl font-bold text-gray-900">
          Jahresprogramm als PDF herunterladen
        </div>
        <div className="mb-0 font-normal">
          Fotos, Videos und Text der letzten Veranstaltungen finden Sie hier.
        </div>
        <PDFDownload
          imageUrl="https://i.imgur.com/4LtthQc.png/"
          description="Jahresprogramm 2021 als PDF →"
        />
        <PDFDownload
          imageUrl="https://i.imgur.com/3uy98We.png"
          description="Jahresprogramm 2020 als PDF →"
        />
        <PDFDownload
          imageUrl="https://i.imgur.com/u7FQKvA.png"
          description="Jahresprogramm 2019 als PDF →"
        />
      </Container>
    </div>
  </Layout>
)

const PDFDownload: FC<{
  imageUrl: string
  description: string
}> = ({ imageUrl, description }) => (
  <div>
    <img src={imageUrl} className="w-full mt-11 mb-6" />
    <div className="flex justify-center py-3 text-base font-medium border border-gray-300 rounded px-14">
      {description}
    </div>
  </div>
)

const Spacer: FC = () => <div className="w-full h-px bg-gray-200 my-9" />

const EventBox: FC<{
  imageUrl: string
  tag: string
  title: string
  description: string
  place: string
  date: string
}> = ({ imageUrl, tag, title, description, place, date }) => (
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-35-65 lg:gap-11">
    {/* NOTE Wrapping div is needed otherwise h-full will be 100vh in Safari */}
    <div>
      <img src={imageUrl} className="w-full lg:object-cover lg:h-full" />
    </div>
    <div>
      <div className="inline-flex rounded px-2.5 py-1.5 text-gray-600 font-medium text-sm bg-gray-200">
        {tag}
      </div>
      <div className="text-gray-900 text-lg font-bold mt-2.5 mb-2">{title}</div>
      <div className="font-normal text-gray-900">{description}</div>
      <div className="font-bold mt-6 mb-1.5">{place}</div>
      <div className="flex justify-between mt-1.5">
        <div className="font-bold text-gray-900">{date}</div>
        <div className="hidden font-bold text-gray-900 lg:block">Mehr →</div>
      </div>
    </div>
  </div>
)

export default Page
