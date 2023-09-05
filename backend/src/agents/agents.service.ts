import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Agent } from "./agents.model";
import { CreateAgentDto } from "./dto/create-agent.dto";

@Injectable()
export class AgentsService {
  constructor(@InjectModel(Agent) private agentRepository: typeof Agent) {}
  async createAgent(dto: CreateAgentDto) {
    const agent = this.agentRepository.create(dto)
    return agent
  }

  async getAllAgents(){
    const agents = this.agentRepository.findAll()
    return agents
  }
}
