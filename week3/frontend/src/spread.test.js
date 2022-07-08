const student = {
    name: 'Khang',
    job: 'QE'
}

const teacher = {
    ...student,
    startDate: 'today'
}


const spread = {
    name: 'Khang',
    job: 'QE',
    startDate: 'today'
}

it('should shallow clone', () => {
    expect(teacher).toEqual(spread)
})