﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfClientt.viewModels.filters {
    public class SingleChoiceFilterMember : FilterMember {

        public string Title { get; private set; }
        public ObservableCollection<RadioButtonViewModel> Choices { get; private set; } = new ObservableCollection<RadioButtonViewModel>();
        private Action<long> finishAction;

        public SingleChoiceFilterMember(IDictionary<long, string> filters, string title, Action<long> finishAction,string groupName) {
            this.Title = title;
            filters.Select(pair => new RadioButtonViewModel(pair.Value, pair.Key,groupName))
                .ToList().ForEach(choice => Choices.Add(choice));
            this.finishAction = finishAction;
        }

        public void Finish() {
            RadioButtonViewModel selected = Choices
                .FirstOrDefault(choice => choice.Selected);
            if (selected != null) {
                finishAction.Invoke(selected.Code);
            }
        }

        public void Reset() {
            foreach (RadioButtonViewModel choice in Choices) {
                choice.Selected = false;
            }
        }

    }
}