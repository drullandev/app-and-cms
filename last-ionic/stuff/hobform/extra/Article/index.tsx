import React, { useEffect, useState, useMemo } from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import jQuery from 'jquery'

import Header from '../../common/Header'
import FooterMenu from '../../common/FooterMenu'

import { MenuProps } from '../../../data/models/Menu'
import { Slide } from '../../../data/models/Slide'
import { getStorage } from '../../../data/utils/storage'
import { translate } from '../../../data/utils/translations'
import { setSubtitle } from '../../../data/utils/jquery'
//import TermsPrivacy from '../../common/TermsPrivacy'
import Slider from '../../common/SliderArticle'
import { appAssets } from '../../../../env'

interface ArticlePageProps extends RouteComponentProps<{
  slug: string
  step: string
}> { }

const Article: React.FC<ArticlePageProps> = ({ match }) => {

  const [header, setHeader] = useState<MenuProps[]>([])
  const [pages, setPages] = useState<Slide[]>([])

  let articles = useMemo(() => {

    return {

      load: () => {

      },

      setByMatch: (match: any) => {
        getStorage('menu_' + match.params.slug).then(menu => {
          menu.show_back = menu.show_search = true
          setHeader(menu)
        })
        getStorage('article_' + match.params.slug).then(articles.assignArticle)
      },

      assignArticle: (article: any) => {
        setPages(article.children)
        articles.setTextHeight()
      },

      setTextHeight: () => {
        setTimeout(()=>{
          let pageHeight = jQuery('#content').height() ?? 0
          let imgBoxHeight = jQuery('.box').first().height() ?? 0
          let value = (pageHeight - imgBoxHeight - 20)
          jQuery('.hob-slide-textarea').animate({height: value + 'px'}, 123)
        },500)
      },

      switchHeaderLabel: (event: any, pages: Slide[], title: any) => {

        let header = jQuery('#header-title-label')
        let subtitle = jQuery('#header-subtitle-label')
        let index = 1

        if (event.target !== null) {

          event.target.getActiveIndex()
            .then((value: any) => (index = value))
            .then(() => {

              if (pages[index] !== undefined) {

                let result = ''

                let label = translate(pages[index].translations, 'title')
                if (label !== header.html()) {
                  result += label
                }

                if (result !== subtitle.html() && result !== header.html()) {
                  articles.setSubtitle(result)
                } else if (result === subtitle.html()) {
                } else {
                  articles.setSubtitle(false)
                }

              }

            })

        }

      },

      setSubtitle: (have: any) => setSubtitle(have, '#header-subtitle-label', '#header-title-container'),

    }

  }, [])

  useEffect(()=>{
    articles.load()
    articles.setTextHeight();
  }, [articles ])

  useEffect(() => {
    articles.setByMatch(match)
  }, [articles, match])

  return <IonPage key={'article-' + match.params.slug} >
    <Header header={header as any} />
    <IonContent className='no-scroll' id='content'>
      <Slider root={appAssets} slideData={pages} step={match.params.step} />
    </IonContent>
    <FooterMenu index={0}/>
  </IonPage>

}

export default React.memo(Article)