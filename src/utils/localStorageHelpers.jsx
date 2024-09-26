export const getTendersFromStorage = () => {
    return JSON.parse(localStorage.getItem('tenders')) || [];
};

export const saveTenderToStorage = (tender) => {
    const tenders = getTendersFromStorage();
    tenders.push(tender);
    localStorage.setItem('tenders', JSON.stringify(tenders));
};

export const saveBidToStorage = (tenderId, bid) => {
    const tenders = getTendersFromStorage();
    const updatedTenders = tenders.map(tender => 
        tender.id === tenderId 
        ? { ...tender, bids: [...(tender.bids || []), bid] }
        : tender
    );
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
};
