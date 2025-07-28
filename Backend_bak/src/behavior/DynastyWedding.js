class DynastyWedding {
    static proposeMarriage(groom, gameState) {

        // 같은 지역의 미혼 여성 찾기
        const availableBrides = [];
        
        groom.dynasty.region.dynasties.forEach(otherDynasty => {
            if (otherDynasty === groom.dynasty) return; // 자기 가문 제외
            
            otherDynasty.persons.forEach(otherPerson => {
            if (otherPerson.married === false && otherPerson.gender === 'female' && gameState.year - otherPerson.createdAt >= 20 && gameState.year - otherPerson.createdAt < 40) {
                availableBrides.push(otherPerson);
            }
            });
        });

        if (availableBrides.length === 0) {
            return; // 구혼할 상대가 없음
        }

        // 무작위 선택 후 결혼
        const bride = availableBrides[Math.floor(Math.random() * availableBrides.length)];
        this.processMarriage(groom, bride, gameState);
    }

    static processMarriage(groom, bride, gameState) {

        // 신부 가문의 인원 수 확인
        let dowry = 0;
        if (bride.dynasty.persons.length === 1) {
            gameState.dynasties.delete(bride.dynasty);
            bride.region.dynasties.delete(bride.dynasty);
        } else {
            // 신부 가문이 2명 이상이면 신랑 가문 재산의 10% 지급
            dowry = Math.floor(groom.dynasty.money * 0.1);
            groom.dynasty.money -= dowry;
            bride.dynasty.money += dowry;
        }

        // 신부를 신랑 가문으로 이동
        bride.dynasty.persons.delete(bride);
        bride.dynasty = groom.dynasty;
        groom.dynasty.persons.add(bride);
        console.log(`💍  ${groom.name}과 ${bride.name}이 결혼했습니다. (지참금: ${dowry})`);

        // 결혼 상태 업데이트
        groom.married = true;
        bride.married = true;
    }
}

module.exports = DynastyWedding;
