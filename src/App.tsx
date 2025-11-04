import { useEffect } from "react";
import Intro from "./Intro";
import EduAbroadChart from "./EduAbroadChart";
import EduAbroadLineChart from "./EduAbroadLineChart";
import KoreaForeignStudentMap from "./KoreaForeignStudentMap"
import RegionBarChart from "./RegionBarChart";
import SemiDoughnutChart from "./SemiDoughnutChart";
import MajorCountryLineChart from "./MajorCountryLineChart";
import StudyAbroadNetLineChart from "./StudyAbroadNetLineChart";
import LangBarChart from "./LangMixChart";
import DropoutLineChart from "./DropoutLineChart";
import DropoutRegionBarChart from "./DropoutRegionStats";
import Interview1 from "./Interview1";
import Interview2 from "./Interview2";
import Interview3 from "./Interview3";
import "./App.css";

function App() {
  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 리셋
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // 데스크톱에서만 동작
      if (window.innerWidth > 1024) {
        const sections = document.querySelectorAll('.data-card-section');
        const textStickies = document.querySelectorAll('.text-sticky') as NodeListOf<HTMLElement>;
        const windowHeight = window.innerHeight;

        // 섹션 인덱스 → 텍스트 인덱스 매핑
        const sectionToTextMap = [0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8];

        // 각 텍스트 박스마다 한 번씩만 처리
        textStickies.forEach((textSticky, textIndex) => {
          if (!textSticky) return;

          // 이 텍스트 인덱스에 해당하는 모든 섹션 찾기
          const groupSections: number[] = [];
          sectionToTextMap.forEach((tIdx, sIdx) => {
            if (tIdx === textIndex) {
              groupSections.push(sIdx);
            }
          });

          if (groupSections.length === 0) return;

          // 그룹의 첫 번째 섹션을 기준으로 활성화 체크
          const firstSectionIndex = groupSections[0];
          const lastSectionIndex = groupSections[groupSections.length - 1];

          const firstRect = sections[firstSectionIndex].getBoundingClientRect();
          const lastRect = sections[lastSectionIndex].getBoundingClientRect();

          // 그룹의 어느 부분이라도 화면 중앙에 있으면 활성화
          if (firstRect.top < windowHeight / 3 && lastRect.bottom > windowHeight / 3) {
            textSticky.classList.add('active');
          } else {
            textSticky.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial call with slight delay to ensure DOM is ready
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="article-root">
      <main className="main-content">
        <Intro />

        <div className="content-wrapper">
          <div className="chart-column">
            <section id="interview-1" className="data-card-section">
              <div className="mobile-text">
                <h3>"마치 내가 유학을 온 것 같아" — 유학생 급증으로 변화하는 캠퍼스 풍경</h3>
                <p>한국인 A씨는 올해 복학하며 4학년 전공 강의실에 들어섰을 때 예상치 못한 광경에 충격을 받았습니다. 수업에 참석한 학생 중 유학생 수가 한국 학생 수를 훨씬 뛰어넘었기 때문입니다. "마치 내가 유학 온 것 같다"는 말은 이제 한국 대학이 단순한 교육기관을 넘어 다문화 사회의 축소판으로 빠르게 변화하고 있음을 실감하게 합니다. 이처럼 유학생의 증가는 단순한 수치 그 이상의 변화를 대학 현장에 일으키고 있습니다.</p>
              </div>
              <div className="data-card">
                <Interview1 />
              </div>
            </section>

            <section id="data-1" className="data-card-section">
              <div className="mobile-text">
                <h3>유학생 수, 2년 새 40% 이상 증가.. 대학가 빠르게 국제화</h3>
                <p>2023년 18만 명을 조금 넘던 외국인 유학생 수는 2025년 25만 명을 돌파하며 2년 동안 무려 40% 이상 증가했습니다. 전체 재적 학생수 대비 유학생 비율도 2023년 5.98%에서 2025년 8.40%로 증가하였으며, 그중 학위과정 유학생의 비율도 4.25%에서 5.94%로 함께 확대되었습니다. 이러한 급격한 증가세는 대학의 글로벌 경쟁력 강화와 함께 다문화 사회의 학교 현장을 분명하게 드러냅니다.</p>
              </div>
              <div className="data-card">
                <EduAbroadChart />
              </div>
            </section>

            <section id="data-2" className="data-card-section">
              <div className="data-card">
                <EduAbroadLineChart />
              </div>
            </section>

            <section id="data-3" className="data-card-section">
              <div className="mobile-text">
                <h3>유학·연수 국제수지 적자 감소 — 유학생 증가가 불러온 경제 변화</h3>
                <p>한국 내 유학생 수 증가와 함께, 유학·연수 관련 해외 유출 적자의 규모가 서서히 감소하고 있습니다. 한국은행 경제통계시스템에 따르면, 적자는 여전히 크지만 최근 몇 년간 점차 줄어드는 추세를 보이고 있습니다. 이는 유학생 증가가 국내 경제에 긍정적인 변화를 가져오고 있음을 시사합니다.</p>
              </div>
              <div className="data-card">
                <StudyAbroadNetLineChart />
              </div>
            </section>

            <section id="data-4" className="data-card-section">
              <div className="mobile-text">
                <h3>수도권 집중화 심화 — 서울·경기 지역에 63% 몰려</h3>
                <p>2025년 현재 서울과 경기도를 합친 지역에 전체 유학생의 63%가 집중되어 있습니다. 서울에는 8만 2,911명, 경기도에는 4만 9,040명이 재학 중이며, 이는 수도권이 국내 교육 및 생활 인프라의 중심임을 반영합니다. 시도별 유학생 비율에서도 서울, 경기, 대전, 충북 등이 약 6~9% 수준을 보이는 반면 울산, 경남, 제주 등은 3~4% 수준에 그치고 있어 분포의 차이가 분명합니다.</p>
              </div>
              <div className="data-card">
                <KoreaForeignStudentMap />
              </div>
            </section>

            <section id="data-5" className="data-card-section">
              <div className="data-card">
                <RegionBarChart />
              </div>
            </section>

            <section id="data-6" className="data-card-section">
              <div className="mobile-text">
                <h3>90.8% 아시아 출신 — 중국·베트남이 절반 이상</h3>
                <p>2024년 기준 전체 유학생의 90.8%가 아시아 출신이며, 특히 중국(34.5%)과 베트남(26.8%) 출신이 절반 이상을 차지하고 있습니다. 우즈베키스탄과 몽골도 지속적으로 증가하고 있으나, 유럽과 북미 출신 학생들의 비중은 매우 낮아 다문화 구성은 특정 지역에 집중된 양상입니다.</p>
              </div>
              <div className="data-card">
                <SemiDoughnutChart />
              </div>
            </section>

            <section id="interview-2" className="data-card-section">
              <div className="mobile-text">
                <h3>"한국에서 미래를 꿈꾸다"</h3>
                <p>중국인 B씨는 어릴 적부터 K콘텐츠에 깊은 애정을 가지고 있었습니다. 한류 드라마와 음악, 영화에 대한 사랑은 자연스럽게 한국 유학을 결심하게 만든 원동력이었습니다. 그는 "한국에서 배우고 싶은 것이 많고, 이곳에서의 경험이 내 미래를 바꿀 것이라 믿는다"고 말했습니다. 하지만 실제 생활은 쉽지 않았습니다. 한국어 미숙으로 수업 중 발표와 토론에 어려움을 겪고, 한국 학생들과 교류가 많지 않아 외로움을 느끼기도 했습니다. 중국인 B씨의 이야기는 최근 급증한 유학생들의 현실적 고민과 희망을 상징합니다. 문화적 차이와 언어 장벽을 넘어서 이들이 한국 대학과 사회에 적응하고, 나아가 글로벌 인재로 성장하기 위해 필요한 배려와 지원이 무엇인지 다시 한 번 생각하게 합니다.</p>
              </div>
              <div className="data-card">
                <Interview2 />
              </div>
            </section>

            <section id="data-7" className="data-card-section">
              <div className="data-card">
                <MajorCountryLineChart />
              </div>
            </section>

            <section id="interview-3" className="data-card-section">
              <div className="mobile-text">
                <h3>언어와 문화가 만든 소통의 거리</h3>
                <p>한국인 학생 A씨와 중국인 유학생 B씨는 대학생활 중 다가가기 어려운 거리감을 느낀다고 말합니다. A씨는 "수업에서는 자주 마주치지만, 팀 프로젝트 외에는 개인적으로 연락하거나 이야기를 나눌 기회가 거의 없습니다"라고 전했습니다. 반면 B씨는 "유학생들끼리 교류하는 경우가 더 많고, 한국 학생들과는 교류가 적습니다"라고 털어놓았습니다. 특히 팀 프로젝트에서는 언어 차이가 큰 장애물이 되고 있습니다. A씨는 "말하는 속도와 단어 수준이 달라서 설명을 몇 번이나 반복해야 할 때가 많고, 서로 이해가 맞지 않아 곤란할 때가 많습니다"라고 전했습니다. 게다가 일부 한국 학생들은 언어 문제로 인해 유학생과 함께 팀 프로젝트를 하는 것을 꺼리는 경향도 있다고 합니다. 이처럼 양측 모두 협력과 소통의 가치를 느끼고 있으나, 언어 격차가 때때로 그 과정을 어렵게 만들기도 합니다.</p>
              </div>
              <div className="data-card">
                <Interview3 />
              </div>
            </section>

            <section id="data-8" className="data-card-section">
              <div className="mobile-text">
                <h3>한국어 능력 충족률 30%대로 급락 — 소통의 아킬레스건 </h3>
                <p>2023년부터 2025년까지 학부 기준 외국인 유학생의 언어 능력 충족률은 48.6%에서 49.9%로 소폭 증가했지만, 한국어 능력 충족률은 같은 기간 39.3%에서 31.9%로 크게 떨어졌습니다. 이는 유학생들이 전반적인 의사소통 능력은 일정하게 유지하지만, 학업 수행에 필수적인 한국어 능력에서는 점차 어려움을 겪고 있음을 의미합니다. 한국어 능력 부족은 강의 이해와 토론, 팀 프로젝트 참여 등에 직접적인 장벽이 되어 유학생들의 학업 적응과 성과에 큰 영향을 미치고 있습니다.</p>
              </div>
              <div className="data-card">
                <LangBarChart />
              </div>
            </section>

            <section id="data-9" className="data-card-section">
              <div className="mobile-text">
                <h3>중도탈락률 '불안한 신호' </h3>
                <p>최근 몇 년간 학부 유학생의 중도탈락률은 6~7%대를 유지하며 매년 4천 명 이상의 학생이 중도 이탈하고 있습니다. 2024년 전국 평균 탈락률은 6%로 소폭 하락했지만, 제주(12.19%), 전남(11.61%), 울산(9.36%) 등 일부 지방대학에서는 10%를 넘기며 매우 높은 수치를 보입니다.이는 지방 다문화 학생들의 유학 생활이 더욱 힘들다는 뜻이며, 거점 대학과 지방 기관의 지원 강화가 필요합니다.</p>
              </div>
              <div className="data-card">
                <DropoutLineChart />
              </div>
            </section>

            <section id="data-10" className="data-card-section">
              <div className="data-card">
                <DropoutRegionBarChart />
              </div>
            </section>

            <div className="summary-desc">
              한국 대학의 유학생 수 증가는 단순한 숫자 증가를 넘어 대학과 지역사회, 나아가 국가 경제에까지 큰 변화를 가져오고 있습니다. 유학생이 많아지면서 글로벌 경쟁력은 강화되고 있지만, 언어와 문화의 벽은 새로운 도전 과제가 되고 있습니다.<br />
              대학의 다문화화는 앞으로 어떤 모습이어야 할지, 우리 모두 함께 고민해 볼 시점입니다.
            </div>

          </div>

          <aside className="text-column">
            <div className="text-sticky">
              <h3>“마치 내가 유학을 온 것 같아” — 유학생 급증으로 변화하는 캠퍼스 풍경</h3>
              <p>한국인 A씨는 올해 복학하며 4학년 전공 강의실에 들어섰을 때 예상치 못한 광경에 충격을 받았습니다. 수업에 참석한 학생 중 유학생 수가 한국 학생 수를 훨씬 뛰어넘었기 때문입니다. “마치 내가 유학 온 것 같다”는 말은 이제 한국 대학이 단순한 교육기관을 넘어 다문화 사회의 축소판으로 빠르게 변화하고 있음을 실감하게 합니다. 이처럼 유학생의 증가는 단순한 수치 그 이상의 변화를 대학 현장에 일으키고 있습니다.</p>
            </div>
            <div className="text-sticky">
              <h3>유학생 수, 2년 새 40% 이상 증가.. 대학가 빠르게 국제화</h3>
              <p>2023년 18만 명을 조금 넘던 외국인 유학생 수는 2025년 25만 명을 돌파하며 2년 동안 무려 40% 이상 증가했습니다. 전체 재적 학생수 대비 유학생 비율도 2023년 5.98%에서 2025년 8.40%로 증가하였으며, 그중 학위과정 유학생의 비율도 4.25%에서 5.94%로 함께 확대되었습니다. 이러한 급격한 증가세는 대학의 글로벌 경쟁력 강화와 함께 다문화 사회의 학교 현장을 분명하게 드러냅니다.</p>
            </div>
            <div className="text-sticky">
              <h3>유학·연수 국제수지 적자 감소 — 유학생 증가가 불러온 경제 변화</h3>
              <p>한국 내 유학생 수 증가와 함께, 유학·연수 관련 해외 유출 적자의 규모가 서서히 감소하고 있습니다. 한국은행 경제통계시스템에 따르면, 적자는 여전히 크지만 최근 몇 년간 점차 줄어드는 추세를 보이고 있습니다. 이는 유학생 증가가 국내 경제에 긍정적인 변화를 가져오고 있음을 시사합니다.</p>
            </div>
            <div className="text-sticky">
              <h3>수도권 집중화 심화 — 서울·경기 지역에 63% 몰려</h3>
              <p>2025년 현재 서울과 경기도를 합친 지역에 전체 유학생의 63%가 집중되어 있습니다. 서울에는 8만 2,911명, 경기도에는 4만 9,040명이 재학 중이며, 이는 수도권이 국내 교육 및 생활 인프라의 중심임을 반영합니다. 시도별 유학생 비율에서도 서울, 경기, 대전, 충북 등이 약 6~9% 수준을 보이는 반면 울산, 경남, 제주 등은 3~4% 수준에 그치고 있어 분포의 차이가 분명합니다.</p>
            </div>
            <div className="text-sticky">
              <h3>90.8% 아시아 출신 — 중국·베트남이 절반 이상</h3>
              <p>2024년 기준 전체 유학생의 90.8%가 아시아 출신이며, 특히 중국(34.5%)과 베트남(26.8%) 출신이 절반 이상을 차지하고 있습니다. 우즈베키스탄과 몽골도 지속적으로 증가하고 있으나, 유럽과 북미 출신 학생들의 비중은 매우 낮아 다문화 구성은 특정 지역에 집중된 양상입니다.</p>
            </div>
            <div className="text-sticky">
              <h3>"한국에서 미래를 꿈꾸다"</h3>
              <p>중국인 B씨는 어릴 적부터 K콘텐츠에 깊은 애정을 가지고 있었습니다. 한류 드라마와 음악, 영화에 대한 사랑은 자연스럽게 한국 유학을 결심하게 만든 원동력이었습니다. 그는 “한국에서 배우고 싶은 것이 많고, 이곳에서의 경험이 내 미래를 바꿀 것이라 믿는다”고 말했습니다. 하지만 실제 생활은 쉽지 않았습니다. 한국어 미숙으로 수업 중 발표와 토론에 어려움을 겪고, 한국 학생들과 교류가 많지 않아 외로움을 느끼기도 했습니다. 중국인 B씨의 이야기는 최근 급증한 유학생들의 현실적 고민과 희망을 상징합니다. 문화적 차이와 언어 장벽을 넘어서 이들이 한국 대학과 사회에 적응하고, 나아가 글로벌 인재로 성장하기 위해 필요한 배려와 지원이 무엇인지 다시 한 번 생각하게 합니다.</p>
            </div>
            <div className="text-sticky">
              <h3>언어와 문화가 만든 소통의 거리</h3>
              <p>한국인 학생 A씨와 중국인 유학생 B씨는 대학생활 중 다가가기 어려운 거리감을 느낀다고 말합니다. A씨는 “수업에서는 자주 마주치지만, 팀 프로젝트 외에는 개인적으로 연락하거나 이야기를 나눌 기회가 거의 없습니다”라고 전했습니다. 반면 B씨는 “유학생들끼리 교류하는 경우가 더 많고, 한국 학생들과는 교류가 적습니다”라고 털어놓았습니다. 특히 팀 프로젝트에서는 언어 차이가 큰 장애물이 되고 있습니다. A씨는 “말하는 속도와 단어 수준이 달라서 설명을 몇 번이나 반복해야 할 때가 많고, 서로 이해가 맞지 않아 곤란할 때가 많습니다”라고 전했습니다. 게다가 일부 한국 학생들은 언어 문제로 인해 유학생과 함께 팀 프로젝트를 하는 것을 꺼리는 경향도 있다고 합니다. 이처럼 양측 모두 협력과 소통의 가치를 느끼고 있으나, 언어 격차가 때때로 그 과정을 어렵게 만들기도 합니다.</p>
            </div>
            <div className="text-sticky">
              <h3>한국어 능력 충족률 30%대로 급락 — 소통의 아킬레스건 </h3>
              <p>2023년부터 2025년까지 학부 기준 외국인 유학생의 언어 능력 충족률은 48.6%에서 49.9%로 소폭 증가했지만, 한국어 능력 충족률은 같은 기간 39.3%에서 31.9%로 크게 떨어졌습니다. 이는 유학생들이 전반적인 의사소통 능력은 일정하게 유지하지만, 학업 수행에 필수적인 한국어 능력에서는 점차 어려움을 겪고 있음을 의미합니다. 한국어 능력 부족은 강의 이해와 토론, 팀 프로젝트 참여 등에 직접적인 장벽이 되어 유학생들의 학업 적응과 성과에 큰 영향을 미치고 있습니다.</p>
            </div>
            <div className="text-sticky">
              <h3>중도탈락률 ‘불안한 신호’ </h3>
              <p>최근 몇 년간 학부 유학생의 중도탈락률은 6~7%대를 유지하며 매년 4천 명 이상의 학생이 중도 이탈하고 있습니다. 2024년 전국 평균 탈락률은 6%로 소폭 하락했지만, 제주(12.19%), 전남(11.61%), 울산(9.36%) 등 일부 지방대학에서는 10%를 넘기며 매우 높은 수치를 보입니다.이는 지방 다문화 학생들의 유학 생활이 더욱 힘들다는 뜻이며, 거점 대학과 지방 기관의 지원 강화가 필요합니다.</p>
            </div>
          </aside>
        </div>
      </main>
      <footer className="byline">
        <div>기획/제작: 김가영 </div>
      </footer>
    </div>
  );
}

export default App;
