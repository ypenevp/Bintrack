package com.legends.backend.services;

import java.util.List;
import java.util.Optional;

import com.legends.backend.entities.Updates;
import org.springframework.stereotype.Service;

import com.legends.backend.repositories.UpdatesRepository;

@Service
public class UpdatesService {
    private final UpdatesRepository updatesRepository;

    public UpdatesService(UpdatesRepository updatesRepository){
        this.updatesRepository = updatesRepository;
    }

    public Updates addUpdates(Updates updates){
        return this.updatesRepository.save(updates);
    }

    public Updates getUpdates(Long id) {
        Optional<Updates> updatesToGet = this.updatesRepository.findById(id);
        if(updatesToGet.isEmpty()){
            return null;
        }
        return updatesToGet.get();
    }
    public Updates updateUpdates(Updates updates){
        Updates updatesToUpdate = this.getUpdates(updates.getId());
        if(updatesToUpdate == null){
            return null;
        }
        if(updates.getTitle() != null){
            updatesToUpdate.setTitle(updates.getTitle());
        }
        if(updates.getArticle() != null){
            updatesToUpdate.setArticle(updates.getArticle());
        }
        return this.updatesRepository.save(updatesToUpdate);
    }

    public List<Updates> getAllUpdates(){
        return this.updatesRepository.findAll();
    }

    public void deleteUpdates(long id){
        this.updatesRepository.deleteById(id);
    }

}
