// 페이징 계산
const getPager = ({ total=0, page=1, listSize=20, pageSize=10 }) => {
    // total : 데이터 전체개수(select count(*) from 테이블)
	// page : 현재페이지(no값)
	// listSize : 한페이지에 보여질 게시물의 수
	// pageSize : 페이지 나누기에 표시될 페이지의 수
	const pager = {};

	pager.totalPage = Math.ceil(total / listSize) ; // 총페이지수(Total Page)
	pager.currentBlock = Math.ceil(page / pageSize); // 현재블록(Current Block)
    pager.totalBlock = Math.ceil(pager.totalPage / pageSize); // 총블록수(Total Block)
	pager.startPage = (pager.currentBlock - 1) * pageSize + 1; // 블록의 처음 페이지(Start Page)
	pager.endPage = (pager.currentBlock * pageSize); // 블록의 마지막 페이지(End Page)
	if(pager.totalPage < pager.endPage) {
		pager.endPage = pager.totalPage;
	}

    pager.prevPage = null;
    pager.nextPage = null;
	if(pager.currentBlock > 1) {
        pager.prevPage = pager.startPage - 1; // 이전 블록
    }
	if(pager.currentBlock < pager.totalBlock) {
        pager.nextPage = pager.endPage + 1; // 다음 블록
    }

	return pager;
};

// 페이징 리스트 생성
const getPagerHtml = (pager) => {
    //console.dir(pager);
    let html = '';
    let i = 0;

    html += '<ul>';
    if(pager.currentBlock > 1) {
        html += `<li><a href="#none" data-prev="${pager.prevPage}">이전</a></li>`;
    }
    for(i = pager.startPage; i <= pager.endPage && i <= pager.totalPage; i++) {
        // 현재페이지
        let style = '';
        if(i === pager.page) {
            style = 'on';
        }
        html += `<li><a href="#none" data-page="${i}"" class="${style}">${i}</a></li>`;
    }
    if(pager.totalBlock > 1 && pager.currentBlock != pager.totalBlock) {
        html += `<li><a href="#none" data-next="${pager.nextPage}">다음</li>`;
    }
    html += '</ul>';
    
    return html;
};
//getPagerHtml(getPager({ total, page, listSize, pageSize }));