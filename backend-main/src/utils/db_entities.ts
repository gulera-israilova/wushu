import {UserEntity} from "../users/entity/user.entity";
import {ClubEntity} from "../clubs/entity/club.entity";
import {SportsmanEntity} from "../sportsmen/entity/sportsman.entity";
import {DirectEntity} from "../direct/entities/direct.entity";
import {Lobby} from "../lobby/entities/lobby.entity";
import {User_lobbyEntity} from "../lobby/entities/user_lobby.entity";


export const DB_ENTITIES = [UserEntity,ClubEntity, SportsmanEntity,DirectEntity,Lobby,User_lobbyEntity];