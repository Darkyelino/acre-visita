import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { Usuario } from '../../../models/Usuario';
import { EPapel } from '../../../models/EPapel';

interface DashboardCard {
  titulo: string;
  descricao: string;
  icone: string;
  link: string;
  papeisPermitidos: EPapel[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  usuarioLogado: Usuario | null = null;
  dataAtual = new Date();
  
  // ✅ LISTA DE CARTÕES ATUALIZADA COM OS NOVOS ÍCONES
  todosOsCards: DashboardCard[] = [
    // --- Para Visitantes ---
    {
      titulo: 'Fazer ou Agendar Visita',
      descricao: 'Registre sua entrada ou agende uma visita futura.',
      icone: 'calendar',
      link: '/visita/fazer',
      papeisPermitidos: [EPapel.VISITANTE]
    },
    {
      titulo: 'Minhas Visitas',
      descricao: 'Veja seu histórico de visitas e envie feedbacks.',
      icone: 'history', // Ícone novo
      link: '/minhas-visitas',
      papeisPermitidos: [EPapel.VISITANTE]
    },
    {
      titulo: 'Reservar Auditório',
      descricao: 'Solicite a reserva de um auditório para seu evento.',
      icone: 'mic',
      link: '/auditorio/reservar',
      papeisPermitidos: [EPapel.VISITANTE]
    },
    {
      titulo: 'Sugerir Título para Filmoteca',
      descricao: 'Tem um filme ou documentário que gostaria de ver aqui?',
      icone: 'film',
      link: '/filmoteca/sugestao',
      papeisPermitidos: [EPapel.VISITANTE]
    },
    {
      titulo: 'Meu Endereço',
      descricao: 'Cadastre ou atualize suas informações de endereço.',
      icone: 'map-pin', // Ícone novo
      link: '/endereco/form',
      papeisPermitidos: [EPapel.VISITANTE]
    },
    
    // --- Para Funcionários ---
    {
      titulo: 'Gerenciar Visitas',
      descricao: 'Confirme ou cancele as visitas agendadas para o seu setor.',
      icone: 'check-square',
      link: '/visita/gerenciar',
      papeisPermitidos: [EPapel.ATENDENTE, EPapel.COORDENADOR, EPapel.ADMINISTRADOR]
    },
    {
      titulo: 'Gerenciar Documentos',
      descricao: 'Adicione ou edite documentos dos visitantes.',
      icone: 'file-text',
      link: '/endereco/list',
      papeisPermitidos: [EPapel.ATENDENTE, EPapel.COORDENADOR, EPapel.ADMINISTRADOR]
    },
    {
      titulo: 'Ver Feedbacks',
      descricao: 'Leia as avaliações e sugestões enviadas pelos visitantes.',
      icone: 'message-square', // Ícone novo
      link: '/feedback/listar',
      papeisPermitidos: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR, EPapel.ATENDENTE]
    },
    
    // --- Para Coordenador e ADM ---
    {
      titulo: 'Gerenciar Reservas',
      descricao: 'Aprove ou recuse as solicitações de reserva de auditório.',
      icone: 'clipboard', // Ícone novo
      link: '/auditorio/gerenciar-reservas',
      papeisPermitidos: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]
    },
    {
      titulo: 'Gerenciar Auditórios',
      descricao: 'Cadastre, edite e veja a lista de todos os auditórios.',
      icone: 'mic-2', // Ícone novo
      link: '/auditorio/list',
      papeisPermitidos: [EPapel.ADMINISTRADOR, EPapel.COORDENADOR]
    },
    
    // --- Apenas para ADM ---
    {
      titulo: 'Gerenciar Funcionários',
      descricao: 'Adicione, edite ou remova atendentes e coordenadores.',
      icone: 'users',
      link: '/funcionario/list',
      papeisPermitidos: [EPapel.ADMINISTRADOR]
    },
    {
      titulo: 'Gerenciar Setores',
      descricao: 'Crie ou edite os setores da instituição.',
      icone: 'briefcase',
      link: '/setor/list',
      papeisPermitidos: [EPapel.ADMINISTRADOR]
    }
  ];
  
  cardsVisiveis: DashboardCard[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.loggedUser;
    this.filtrarCardsPorPapel();
  }

  filtrarCardsPorPapel(): void {
    if (this.usuarioLogado) {
      const papelUsuario = this.usuarioLogado.papel;
      this.cardsVisiveis = this.todosOsCards.filter(card => 
        card.papeisPermitidos.includes(papelUsuario)
      );
    }
  }
}