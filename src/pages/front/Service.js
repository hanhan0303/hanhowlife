export default function Service() {
  return (
    <>
      <div className="service container-fluid px-md-0 min-height">
        <div className="service-banner">
          <h1 className="fs-4">常見問題 FAQ</h1>
        </div>
        <div className="container service-cont my-5">
          <div className="accordion" id="faqAccordion">
            {/* Q1 水晶保養與淨化方式 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  水晶保養與淨化方式
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    HanHowLife
                    所使用的天然水晶皆經挑選與淨化，但水晶如同我們的身體，也需要定期清理與休息。建議以下方式保養水晶飾品：
                  </p>
                  <ul>
                    <li>
                      避免長時間曝曬與碰水（如泡溫泉、洗澡、游泳時請取下）
                    </li>
                    <li>
                      配戴一段時間後可進行淨化，建議方式：
                      <ul>
                        <li>白水晶團／晶洞淨化</li>
                        <li>曬月光（不建議曝曬日光）</li>
                        <li>使用音叉、頌缽或純淨意念祝福</li>
                      </ul>
                    </li>
                    <li>避免與化學物質接觸，如香水、清潔劑等</li>
                  </ul>
                  <p>建議每週定期與水晶對話，感謝它的陪伴與支持。</p>
                </div>
              </div>
            </div>

            {/* Q2 能量油使用與保存期限 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  能量油使用與保存期限
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    HanHowLife
                    能量油為天然植物精油製作，無添加防腐劑，請依以下方式使用與保存：
                  </p>
                  <ul>
                    <li>
                      建議保存期限：<strong>3 個月內使用完畢</strong>，效力最佳
                    </li>
                    <li>保存方式：放置陰涼處，避免陽光直射與高溫潮濕</li>
                    <li>
                      使用方式：可塗抹於手腕、脈輪處、或於冥想前深呼吸嗅聞
                    </li>
                    <li>
                      如皮膚有敏感狀況，請先做局部測試，勿塗抹於傷口或眼周
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Q3 蠟燭使用注意事項 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  蠟燭使用注意事項
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>HanHowLife 蠟燭以天然大豆蠟製作，搭配能量意圖與香氛：</p>
                  <ul>
                    <li>
                      每次點燃建議 <strong>1～2 小時內熄滅</strong>
                      ，避免過度燃燒
                    </li>
                    <li>使用時請勿離開視線範圍，遠離布料、紙張等易燃物品</li>
                    <li>燃燒後蠟面如有不平整屬正常，可於下次使用時融平</li>
                    <li>建議放置於平穩的耐熱表面，避免兒童與寵物接觸</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Q4 付款方式 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  付款方式
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    目前僅提供 <strong>線上信用卡付款</strong>。
                  </p>
                </div>
              </div>
            </div>

            {/* Q5 修改、取消訂單問題 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  修改、取消訂單問題
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    如需修改訂單，請儘速透過{' '}
                    <strong>Instagram 私訊或 LINE 官方帳號</strong> 聯繫我們，
                    <br />
                    已出貨之訂單恕無法更改或取消，敬請見諒。
                  </p>
                </div>
              </div>
            </div>

            {/* Q6 退換貨與退款說明 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  退換貨與退款說明
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    HanHowLife 所有商品皆為能量導入的 <strong>接單製作</strong>
                    ，具個人化與靈性性質，恕不提供退換貨服務。
                    <br />
                    若商品於運送過程中有嚴重破損，請於{' '}
                    <strong>收到商品 24 小時內私訊我們</strong>
                    ，我們會儘快協助處理。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
