import { Controller, Post, Get, Body } from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Agents')
@Controller("agents")
export class AgentsController {
  constructor(private agentsService: AgentsService) {}
  @Post()
  create(@Body() agentDto: CreateAgentDto) {
    return this.agentsService.createAgent(agentDto);
  }

  @Get()
  getAll() {
    return this.agentsService.getAllAgents();
  }
}
