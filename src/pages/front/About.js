import FadeInBox from '../../components/FadeInBox';

export default function About() {
  return (
    <>
      <div className="about container-fluid px-md-0  min-height">
        <div className="about-banner">
          <h1 className="fs-4">HanHowLife 的故事</h1>
        </div>
        <FadeInBox as="div" className="container about-cont">
          <section className="mt-5 mb-5">
            <h3 className="fs-5 mb-2">能量的起點</h3>
            <p>
              HanHowLife
              的誕生，來自一個關於療癒與陪伴的念頭。曾經在人生迷霧中尋找出口的我，開始接觸水晶、精油、蠟燭──這些看似微小的自然元素，卻悄悄地，在日常中帶來了變化。
              <br />
              那時的我，會在夜裡點上一顆小小的蠟燭，看著火光搖曳；戴上水晶手鍊，提醒自己每一刻都能選擇穩定與信任；在焦慮的早晨抹上一點能量油，深呼吸，喚回內在的力量。
              <br />
              不是一夜之間就好了，而是慢慢地、一次又一次地，把自己接回來。
            </p>
          </section>
          <section className="mb-5">
            <h3 className="fs-5 mb-2">關於名字 HanHowLife</h3>
            <p>
              「HanHowLife」是一個帶有雙重意涵的名字。
              <br />
              一方面，「HanHowLife」是中文「很好生活」的諧音，傳遞出我對生活的期許
              —— 希望每個人都能擁有屬於自己的好好生活。
              <br />
              Han
              是我名字中的一部分，「HowLife」既是「如何生活」，也是「好生活」的諧音。這個品牌名稱不只是對別人提出溫柔的邀請，也是在提醒我自己，怎麼在生活裡與自己同行、與世界對話。
              <br />
              我相信，當我們開始用心生活，每個日常都可以是療癒的力量源頭。
            </p>
          </section>
          <section className="mb-5">
            <h3 className="fs-5 mb-2">小小空間，大大心意</h3>
            <p>
              HanHowLife
              從一個角落的小工作桌開始，一顆一顆挑選水晶、一滴一滴調製能量油。雖然空間不大，卻懷著希望：能讓每一件商品，都帶著「很好生活」的祝福，進入你生命的片刻。
              <br />
              或許，你也正走在一段不容易的旅程中。我想對你說：你並不孤單。
              <br />
              願你在 HanHowLife
              找到一點力量、一點光，然後重新出發，繼續走出屬於你的美好生活。
            </p>
          </section>
          <section className="mb-5">
            <h3 className="fs-5 mb-2">版權宣告</h3>
            <p>
              HanHowLife 網站 圖片 及 文字
              僅供個人作品使用，不提供轉載、引用及商業用途。
              <br />
              圖片來源：
              <a href="https://unsplash.com/" target="_blank">
                Unsplash
              </a>
              、
              <a href="https://www.flaticon.com/" target="_blank">
                Flaticon
              </a>
              、
              <a href="https://www.canva.com/" target="_blank">
                Canva
              </a>
            </p>
          </section>
        </FadeInBox>
      </div>
    </>
  );
}
