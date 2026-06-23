bool low_level_eval(…) {
	:
	if(something_went_wrong) return false;
	:
}
bool middle_level_eval(…){
	:
	bool result = low_level_eval(…);
	if(!result) return false;
	:
}
bool top_level_eval(…){
	:
	bool result = middle_level_eval(…);
	if(!result) return false;
	:
}
int main(void){
	:
	bool result = top_level_eval(…);
	if(!result) {
		cout &lt;&lt; "Sarcasm!" &lt;&lt; endl;
		return 1;
	}
}