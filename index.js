const formatador = (data) => {

  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

const atividade = {
  nome: 'Academia',
  data: new Date('2024-07-15 08:00'),
  finalizada: true
}

let atividades = [
  atividade,
  {
    nome:'Almoço',
    data: new Date('2024-07-15 12:00'),
    finalizada: false
  },
  {
    nome:'Estudo',
    data: new Date('2024-07-15 16:00'),
    finalizada: false
  },
  {
    nome:'Jantar',
    data: new Date('2024-07-15 21:00'),
    finalizada: false
  },
]

const criarItemDeAtividade = (atividade) => {

  let input = '<input type="checkbox" '

   if(atividade.finalizada) {
    input += 'checked'
   }

   input += '>'

   const formatar = formatador(atividade.data)

  return `
  <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>

     ${formatar.dia.semana.longo},

     dia ${formatar.dia.numerico}

     de ${formatar.mes}

     às ${formatar.hora}h

    </time>
  </div>
 `
}

const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if(atividades.length == 0) {
    section.innerHTML = `<p> Nenhuma atividade cadastrada.</p>`
    return
  }

  for(let atividade of atividades) {
   section.innerHTML += criarItemDeAtividade(atividade)
  }
}
atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  const atividade = {
   nome,
   data,
   finalizada: false
 }

 const atividadeExiste = atividades.find((atividade) => {
  return atividade.data == novaAtividade.data
 } )

 if (atividadeExiste) {
  return alert('Dia/Hora não disponível')
 }

 atividades = [atividade, ...atividades]
 atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
  const dias = [
    '2024-11-05',
    '2024-11-06',
    '2024-11-07',
    '2024-11-08',
    '2024-11-09',
  ]

  let diasSelecao = ''

  for(let dia of dias) {

    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de
    ${formatar.mes}
    `

    diasSelecao += `
    <option value="${dia}">${diaFormatado}</option>
    `
  }

  document
  .querySelector('select[name="dia"]')
  .innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for(let i = 6; i < 23; i++) {
    horasDisponiveis += `<option value="${i}:00">${i}:00</option>`
    horasDisponiveis += `<option value="${i}:30">${i}:30</option>`
  }

  document
  .querySelector('select[name="hora"]')
  .innerHTML = horasDisponiveis
}
criarHorasSelecao()